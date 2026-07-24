import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractResumeText = async (buffer) => {
    const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
    });

    const pdf = await loadingTask.promise;

    let text = "";

    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
        const page = await pdf.getPage(pageNo);

        const content = await page.getTextContent();

        const strings = content.items.map((item) => item.str);

        text += strings.join(" ") + "\n";
    }

    return text;
};