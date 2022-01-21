import { Result } from "./Result";


export class ResponseJson {
    nextPageToken :String;
    results: Result[];
    status : String;
}