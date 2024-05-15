function convert(x, y, width, height, tree) {
    let svgAppendix = ''
    let h = height / tree.length
    let current_y = y
    for (let block of tree) {
        if (block.type == 0) { // sequential statement - function call
            svgAppendix += createSequenceBlock(x, current_y, width, h, block.content).svgAppendix
            current_y += h
        }
        else if (block.type == 1) { //ifs

        }
        else if (block.type == 2) { //ifs and else

        }
    }
    return svgAppendix
}

function getHeight() {

}