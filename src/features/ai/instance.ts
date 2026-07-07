import { ENVIRONMENT } from "@/config/environment";
import { GoogleGenAI } from "@google/genai";

export function createAI(){
   if(!ENVIRONMENT.GoogleGenAIKey) {
    throw new Error ('AI API key is missing')
   }
const ai = new GoogleGenAI({
  apiKey: ENVIRONMENT.GoogleGenAIKey,
});
return ai 
}