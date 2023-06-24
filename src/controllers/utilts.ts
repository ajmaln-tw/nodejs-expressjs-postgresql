import _ from "lodash"
import { UserInstance } from "../models/User"


export const formatUserBasicDetails = (user: UserInstance) => {
    let newUserBasicDetails = _.pick(user, ["name", "email", "id"])
    return newUserBasicDetails;
}