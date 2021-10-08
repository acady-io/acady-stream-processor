export interface StreamInterface {
    addRecord(redcord: any);
    processRecords(): Promise<void>;
}

export default abstract class Stream implements StreamInterface {

    protected records: any[] = [];

    addRecord(record: any) {
        this.records.push(record);
    }

    clearRecords() {
        this.records = [];
    }

    abstract processRecords();

}
