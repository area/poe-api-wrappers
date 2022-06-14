import { buildURL, requestTransformed, requestTransformedArray, requestResponse } from "../../../common/functions";
import { RealmOptions } from "../../shared/models";
import { Character } from "./Character";
import { Items } from "./Items";
import { PassiveSkills } from "./PassiveSkills";
import { AxiosResponse } from "axios";

/**
 * @remarks
 * Requires `sessionId` to be set in [[Settings]] if profile or character tab is private.
 *
 * @endpoint https://api.pathofexile.com/character-window/get-characters
 * @param accountName
 * @param options
 * @returns A list of characters of an account
 * @throws [[APIError]]
 */
export const get = async (accountName: string, options?: RealmOptions): Promise<Character[]> => {
    const url = buildURL(
        `https://api.pathofexile.com/character-window/get-characters`,
        options,
        null,
        { accountName }
    );

    return await requestTransformedArray(Character, url);
};

/**
 * @remarks
 * Requires `sessionId` to be set in [[Settings]] if profile or character tab is private.
 *
 * @endpoint https://api.pathofexile.com/character-window/get-items
 * @param accountName
 * @param character
 * @param options
 * @throws [[APIError]]
 */
export const getItems = async (
    accountName: string,
    character: string,
    options?: RealmOptions
): Promise<Items> => {
    const url = buildURL(`https://api.pathofexile.com/character-window/get-items`, options, null, {
        accountName,
        character,
    });

    return await requestTransformed(Items, url);
};

/**
 * @remarks
 * Requires `sessionId` to be set in [[Settings]] if profile or character tab is private.
 *
 * @endpoint https://api.pathofexile.com/character-window/get-passive-skills
 * @param accountName
 * @param character
 * @param options
 * @throws [[APIError]]
 */
export const getPassiveSkills = async (
    accountName: string,
    character: string,
    options?: RealmOptions
): Promise<PassiveSkills> => {
    const url = buildURL(
        `https://www.pathofexile.com/character-window/get-passive-skills`,
        options,
        null,
        { accountName, character, reqData: "0" }
    );

    return await requestTransformed(PassiveSkills, url);
};


/**
 * @remarks
 *
 * @endpoint https://api.pathofexile.com/character-window/view-atlas-skill-tree
 * @param accountName
 * @param realm
 * @param league
 * @throws [[APIError]]
 */
export const getNAtlasSkills = async (
    accountName: string,
    realm: string,
    league: string
): Promise<number> => {
    const url = buildURL(
        `https://www.pathofexile.com/character-window/view-atlas-skill-tree`,
        null,
        null,
        { accountName, realm, league }
    );

    let response: AxiosResponse;
    response = await requestResponse(url);

    let encodedTree: string;

    encodedTree = response.request.res.socket._httpMessage.path.replace('/fullscreen-atlas-skill-tree/', '');
    encodedTree = encodedTree.replace('-', '+').replace('_', '/');
    while (encodedTree.length % 4){
        encodedTree += '=';
    }
    const buffer = Buffer.from(encodedTree || '', 'base64').toString('hex')

    return parseInt(buffer.substring(12,14), 16);
};
