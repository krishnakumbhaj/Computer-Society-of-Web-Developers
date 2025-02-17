import { QUERY_TABLE } from "./config";
import db from "./db";  // Import the supabase client

// Define the name of the table that will be used to store the queries.

const queryTable = QUERY_TABLE;

// Define the types that will be used in the functions of this module.

interface UserQuery {
    name: string;
    email: string;
    phone: string;
    query: string;
};

interface AddResponse {
    success: boolean;
    data?: string;
    error?: string;
}

interface GetResponse {
    success: boolean;
    data?: UserQuery[];
    error?: string;
}

interface DeleteResponse {
    success: boolean;
    error?: string;
}

// Define the function that will be used to query the database.

export const insertQuery = async (query: UserQuery): Promise<AddResponse> => {
    try {
        const { data, error } = await db.from(queryTable).insert([query]);
        if (error) {
            return { success: false, error: error?.message };
        }
        return { success: true, data: data?.[0] };
    } catch (error) {
        return { success: false, error: error as string };
    }
};

export const getQueries = async (): Promise<GetResponse> => {
    try {
        const { data, error } = await db.from(queryTable).select("*");
        if (error) {
            return {success: false, error: "Unable to fetch queries..." };
        }
        return { success: true, data: data };
    } catch (error) {
        return { success: false, error: "Unable to fetch queries..." };
    }
};

export const deleteQuery = async (id: number): Promise<DeleteResponse> => {
    try {
        const { error } = await db.from(queryTable).delete().match({ id: id });
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    } catch (error) {
        return { success: false, error: error as string };
    }
};

export const updateStatus = async (id: number, status: string): Promise<DeleteResponse> => {
    try {
        const { error } = await db.from(queryTable).update({ status: status }).match({ id: id });
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    } catch (error) {
        return { success: false, error: error as string };
    }
}