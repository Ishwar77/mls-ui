import { GridHeader } from './grid-models';
export class GridUtilities {

    static getHeaderAry(gridObj: any, minCount): GridHeader[] {
        if (!gridObj) {
            return;
        }

        const props = Object.getOwnPropertyNames(gridObj);

        const headers = props.map((p, index) => {
            return new GridHeader( GridUtilities.transformColumnNames(p), p, index < minCount ? true : false);
        });

        return headers;
    }


    static transformColumnNames(colName, seperator="_") {
        if(!colName || !colName.length) {
            return colName
        }

        const words = colName.split(seperator);

        if(!words || !words.length) {
            return colName
        }

        const transformed = words.map(s => s.charAt(0).toUpperCase() + s.slice(1) );

        return transformed.join(' ');
    }
}