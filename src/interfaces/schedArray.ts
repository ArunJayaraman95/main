export interface ISchedArray {
    Subject: string,
    Id: string,
    StartTime: Date,
    EndTime: Date,
    RecurrenceRule?: string,
    RecurrenceException: string,
}