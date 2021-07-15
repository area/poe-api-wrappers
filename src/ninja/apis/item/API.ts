import { buildURL, requestTransformed } from "../../../common/functions";
import { HistoryPoint } from "../../shared";
import { LanguageCode } from "../../shared/models";
import { ItemType } from "./models";
import { Collection } from "./Collection";

/**
 * @endpoint https://poe.ninja/api/data/ItemOverview
 * @param league
 * @param type
 * @param language
 */
export const get = async (
    league: string,
    type: ItemType,
    language: LanguageCode = "en"
): Promise<Collection> => {
    const url = buildURL(`https://poe.ninja/api/data/ItemOverview`, null, null, {
        league,
        type,
        language,
    });
    return <Collection>await requestTransformed(Collection, url);
};

/**
 * @endpoint https://poe.ninja/api/data/ItemHistory
 * @param league
 * @param type
 * @param id
 */
export const getHistory = async (
    league: string,
    type: ItemType,
    id: number
): Promise<HistoryPoint[]> => {
    const url = buildURL(`https://poe.ninja/api/data/ItemHistory`, null, null, {
        league,
        type,
        itemId: id.toString(),
    });

    return <HistoryPoint[]>await requestTransformed(HistoryPoint, url);
};
