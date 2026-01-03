import "dotenv/config";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import supabase from "../supabaseClient";

const port: number = Number(process.env.PORT) || 5174;
const CLIENT_ORIGIN: string = "http://localhost:5173";

const app = new Elysia()

    // ── Middleware ────────────────────────────────────────
    .use(
        cors({
            origin: [CLIENT_ORIGIN],
        })
    )

    // ── Route "cafe_items" ────────────────────────────────────────
    .group("cafe_items", (app) => {
        return (
            app
                // ── GET Requests ────────────────────────────────────────
                .get(
                    "/",
                    async ({ status }): Promise<Array<object> | unknown> => {
                        // (): Promise<object | unknown>

                        // ── SELECT * FROM cafe_items ────────────────────────────────────────
                        const { data: item, error: dbErr } = await supabase
                            .from("cafe_items")
                            .select("*");

                        // ── Handle DB Errors ────────────────────────────────────────
                        if (dbErr) {
                            return { message: dbErr.message };
                        }

                        // ── Success ────────────────────────────────────────
                        return status(200, item);
                    }
                )

                .get("/:id", async ({ params, status }) => {
                    const id: number = Number(params.id);
                    const { data: requestedItem, error: requestedItemErr } =
                        await supabase
                            .from("cafe_items")
                            .select("*")
                            .eq("id", id)
                            .single();

                    if (requestedItem.length == 0) {
                        return status(404, {
                            message: `ID:${id} is invalid, could not find resource`,
                        });
                    }
                    if (requestedItemErr) {
                        return status(500, requestedItemErr.message);
                    }

                    return status(200, requestedItem);
                })

                // ── POST Requests ────────────────────────────────────────
                .post("/", async ({ status, body }) => {
                    const { data: item, error: itemErr } = await supabase
                        .from("cafe_items")
                        .insert(body)
                        .select()
                        .single();

                    if (itemErr) {
                        return status(500, itemErr.message);
                    }

                    if (item.length < 1) {
                        return status(400, "Required info was not sumbitted");
                    }

                    // ── Sucess ────────────────────────────────────────
                    return status(201, item);
                })

                // ── PATCH Requests ────────────────────────────────────────
                .patch("/:id", async ({ params, body, status }) => {
                    const id: number = Number(params.id);
                    const updates = body;

                    // TODO: Implement cross-reference check - item & provided body
                    // ── Compare existing item to provided body ────────────────────────────────────────
                    // const { data, error } = await supabase
                    //     .from("cafe_items")
                    //     .select("*")
                    //     .eq("id", id)
                    //     .single();

                    // // ── Error Handling ────────────────────────────────────────
                    // if (!data || error || data.length === 0) {
                    //     return status(404, { message: `ID-${id} does not exist` });
                    // }

                    // ── Update Item ────────────────────────────────────────
                    const { data: updatedItem, error: updateError } =
                        await supabase
                            .from("cafe_items")
                            .update(updates)
                            .eq("id", id)
                            .select()
                            .single();

                    // ── Error Handling ────────────────────────────────────────
                    if (updateError) {
                        return status(500, updateError.message);
                    }

                    // ── Success ────────────────────────────────────────
                    status(200, {
                        message: "Succesfully updated",
                        item: updatedItem,
                    });
                })
        );
    })

    // ── Server Listen ────────────────────────────────────────
    .listen(port);
console.log(`Server running: http://localhost:${port}`);
