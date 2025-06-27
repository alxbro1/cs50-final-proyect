import axios from "axios";
import zod from "zod";

export const FieldSchema = zod.object({
    name: zod.string(),
    label: zod.string(),
    type: zod.string(),
});
export const FieldResponseSchema = zod.array(FieldSchema);

export class FieldsTableService {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async getFields() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/${this.tableName}/fields`);
        return FieldResponseSchema.parse(response.data);
    }

    async getRows() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/${this.tableName}`);
        return response.data;
    }

    async deleteRow(id: number) {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/${this.tableName}/${id}`);
        if (response.status != 200 && response.status != 204) {
            throw new Error(`Failed to delete row with id ${id}`);
        }
        window.location.reload();
    }
}