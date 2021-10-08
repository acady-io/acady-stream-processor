import Stream from "./stream";

export class StreamProcessor {

    private streamsMap: Map<string, Stream> = new Map<string, Stream>();

    public registerStream(streamName: string, stream: Stream) {
        this.streamsMap.set(streamName, stream);
    }

    public async process(event: any) {
        const records: any[] = event.Records;

        for (let record of records) {
            const source = record.eventSourceARN;

            if (this.streamsMap.has(source)) {
                const stream = this.streamsMap.get(source);
                if (stream)
                    stream.addRecord(record);
            } else {
                console.log("No stream registered for source " + source);
            }
        }

        const streams: Stream[] = Array.from(this.streamsMap.values());

        await Promise.all(streams.map(stream => stream.processRecords()));

        streams.forEach(stream => stream.clearRecords());
    }

}
