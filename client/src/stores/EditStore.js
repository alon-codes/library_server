import { makeAutoObservable } from 'mobx';

export default class EditStore {
    title = ""
    publication_date = new Date()

    constructor(){
        makeAutoObservable(this);
    }
}