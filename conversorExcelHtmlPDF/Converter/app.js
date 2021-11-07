const HtmlParser = require('./Classes/HtmlParser')
const Processor = require('./Classes/Processor')
const Reader = require('./Classes/Reader')
const Writer = require('./Classes/Writer')
const Table = require('./Classes/Table')
const PDFWriter = require('./Classes/PdfWriter')

const reader = new Reader()
const writer = new Writer()
const pdfWriter = new PDFWriter()

async function main() {
    var data = await reader.Reader('./excel.CSV')
    var processedData = Processor.Process(data)

    var table = new Table(processedData)
    var html = await HtmlParser.Parse(table)
    
    // dando erro:
    
    // console.log(html)

//  writer.Write('teste.html', html) //na aula foi criado com a data (Date.now() + '.html')
    pdfWriter.WritePDF('pdf.html')
}


main()