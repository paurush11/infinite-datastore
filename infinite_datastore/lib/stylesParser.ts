type TStyleNode = {
    text: string
    style: string
    node: ChildNode
}
export class SpanStyleParser {
    htmlString: string = ""
    styles: TStyleNode[] = []
    constructor(htmlString: string) {
        this.htmlString = htmlString
        this.parse();
    }

    parse: () => void = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.htmlString, "text/html");
        const div = doc.querySelector('div');
        if (div) {
            Array.from(div.childNodes).forEach(node => {
                let style = {} as TStyleNode;
                style.node = node
                style.text = node.textContent || ""
                if (node.nodeType === 3) {
                    style.style = ""
                } else if (node.nodeType === 1) {
                    style.style = (node as HTMLDivElement).style.cssText
                }

                this.styles.push(style);
            })
        }
    }

    displayStyles: () => void = () => {
        this.styles.forEach(st => {
            console.log(st);
        })
    }

}


