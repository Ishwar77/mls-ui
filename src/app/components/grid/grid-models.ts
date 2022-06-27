export class GridHeader {
    id?: any;
    title?: string;
    property?: string;
    type?: GridColumnType;
    selected?: boolean;
    isVisible?: boolean;
    constructor(title, property, selected = false, isVisible = true, id = new Date().getTime(), type = GridColumnType.ANY) {
        this.id = id || new Date().getTime();
        this.title = title;
        this.property = property;
        this.type = type || GridColumnType.ANY;
        this.selected = selected || false;
        this.isVisible = isVisible || true;
    }
}

export enum GridColumnType {
    INTEGER = 'INTEGER',
    NUMBER = 'NUMBER',
    STRING = 'STRING',
    DATE = 'DATE',
    ANY = 'ANY'
}
