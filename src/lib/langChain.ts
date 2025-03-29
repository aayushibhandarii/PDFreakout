import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl:string){

    const response = await fetch(fileUrl); //as fileUrl is the physical path of the file
    const blob = await response.blob();

    const arrayBuffer = await blob.arrayBuffer();

    const loader = new PDFLoader(new Blob([arrayBuffer]));
    const docs = await loader.load();   //loads all the documents
    return docs.map((doc)=>doc.pageContent).join("\n");
}