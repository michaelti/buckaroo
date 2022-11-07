import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";

// DB config
import { Model } from "objection";
import Knex from "knex";
import config from "../db/knexfile";

// Initialize knex and give the instance to objection.
const knex = Knex(config);
Model.knex(knex);

export default function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
    const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

    responseHeaders.set("Content-Type", "text/html");

    return new Response("<!DOCTYPE html>" + markup, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
