import {validateTelegramData} from "@/components/utils/validateTelegramData";

export interface UserData {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    language_code: string,
    allows_write_to_pm: boolean,
    authDate: number

}

export function getValidUser (query: string) {

    if (!query) {
        return {
            "valid": false,
            "userData": null
        }
    }

    const dataValid = validateTelegramData(query)

    if (!dataValid) {
        return {
            "valid": false,
            "userData": null
        }
    }

    const match = query.match(/[?&]user=([^&]*)/);
    const user = match ? match[1] : null;


    if (!user) {
        return {
            "valid": false,
            "userData": null
        }
    }

    const userDict: UserData = JSON.parse(decodeURIComponent(user))

    const regex = /auth_date=(\d+)/;
    const match1 = query.match(regex);

    if (match1) {
        try {
            userDict['authDate'] = Number(match1[1])

            // const rDate = Number(match1[1])
            // const nDAte = Math.floor(+Date.now()/1000)
            //
            // console.log(nDAte - rDate)

        } catch (err) {
            return {
                "valid": false,
                "userData": null
            }
        }
    }

    return {
        "valid": dataValid,
        "userData": userDict
    }

}
















