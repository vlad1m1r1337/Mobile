import {opereators} from "@/app/constants";

export const cutOperators = (res: string) => {
    if (opereators.includes(res[res.length - 1])) {
        return res.slice(0, -1);
    }
    return res;
}