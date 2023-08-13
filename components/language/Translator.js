
export default function Translator(language) {

    //translator
    function translateIt(color) {
        let text;
        switch(color) {
            default:
                text = "WHITE";
                break;
            case "red":
                text = language.red;
                break;
            case "green":
                text = language.green;
                break;
            case "blue":
                text = language.blue;
                break;
            case "orange":
                text = language.orange;
                break;
            case "yellow":
                text = language.yellow;
                break;
            case "white":
                text = language.white;
                break;
            case "pink":
                text = language.pink;
                break;
            case "purple":
                text = language.purple;
                break;
            case "color":
                text = "COLOR";
                break;
            case "textv1":
                text = language.textv1;
                break;
            case "textv2":
                text = language.textv2;
                break;
        }

        return text
    }

    return {translateIt}
}