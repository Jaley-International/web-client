import {Node} from "../helper/processes";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {faFile, faFileAlt, faFileAudio, faFileImage, faFilePdf, faFileVideo} from "@fortawesome/free-regular-svg-icons";
import {capitalize, formatBytes} from "./string";


/**
 * Returns an icon type for the input node
 */
export function nodeToIcon(node: Node): IconProp {
    if (node.type === "FOLDER") return faFolder;
    if (!node.metaData.type) return faFile;

    const [type, subtype] = node.metaData.type.split(/\//);
    if (!type || !subtype) return faFile;

    if (type === "text") return faFileAlt;
    if (type === "image") return faFileImage;
    if (type === "audio") return faFileAudio;
    if (type === "video") return faFileVideo;
    if (subtype === "pdf") return faFilePdf;
    return faFile;
}


/**
 * Returns a description for the input node
 */
export function nodeToDescription(node: Node): string {
    if (node.type === "FOLDER") {
        if (node.children.length === 0) return "Empty folder";
        return `Folder, ${node.children.length} item${node.children.length >= 2 ? "s" : ""}`;
    } else {
        const subtype = node.metaData.type?.split(/\//).pop();
        const size = ", " + formatBytes(node.metaData.size || 0);
        return `${capitalize(subtype || "")} file${node.metaData.size ? size : ""}`
    }
}
