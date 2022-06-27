// import { ItemMaster } from '../../models/item';
/**
 * TODO: Get the foreign key references to replace all the object ID's, this will help to show accurate data in the Front-end
 */
export class CalenderMasterUtil {
    static getHideableHeaders() {
        return [
            "cal_date_id",
            "cal_id",
            "daterangelist",
            "active_flag",
            "created_by",
            "future_char1",
            "future_char2",
            "future_char3",
            "future_char4",
            "future_char5",
            "future_char6",
            "future_char7",
            "future_char8",
            "future_char9",
            "future_char10",
            "future_num1",
            "future_num2",
            "future_num3",
            "future_num4",
            "future_num5",
            "future_num6",
            "future_num7",
            "future_num8",
            "future_num9",
            "future_num10",
            "future_date1",
            "future_date2",
            "future_date3",
            "future_date4",
            "future_date5",
            "future_date6",
            "future_date7",
            "future_date8",
            "future_date9",
            "future_date10"
        ];
    }

    // static getItemMasterModel(uom_name, conversion, fromId, toId, item_id, cust_id) {
    //     const uom = {
    //         uom_conv_id: 0,
    //         item_id: 0,
    //         from_uom_id: 0,
    //         to_uom_id: 0,
    //         cust_id: 0,
    //         conversion: 0,
    //         active_flag: 1,
    //         inactive_date: new Date(),
    //         created_by: 0,
    //         created_date: new Date(),
    //         last_updated_by: 0,
    //         last_updated_date: new Date(),
    //         future_char1: "string",
    //         future_char2: "string",
    //         future_char3: "string",
    //         future_char4: "string",
    //         future_char5: "string",
    //         future_char6: "string",
    //         future_char7: "string",
    //         future_char8: "string",
    //         future_char9: "string",
    //         future_char10: "string",
    //         future_num1: 0,
    //         future_num2: 0,
    //         future_num3: 0,
    //         future_num4: 0,
    //         future_num5: 0,
    //         future_num6: 0,
    //         future_num7: 0,
    //         future_num8: 0,
    //         future_num9: 0,
    //         future_num10: 0,
    //         future_date1: new Date(),
    //         future_date2: new Date(),
    //         future_date3: new Date(),
    //         future_date4: new Date(),
    //         future_date5: new Date(),
    //         future_date6: new Date(),
    //         future_date7: new Date(),
    //         future_date8: new Date(),
    //         future_date9: new Date(),
    //         future_date10: new Date(),
    //     };

    //     uom.active_flag = 1;
    //     uom.conversion = conversion;
    //     uom.from_uom_id = fromId;
    //     uom.to_uom_id = toId;
    //     uom.item_id = item_id;
    //     uom.cust_id = cust_id;

    //     return uom;
    // }
}
