function convert(x, y, width, height, tree) {
    console.log("Converting ", tree)
    let svgAppendix = ''
    //let h = height / tree.length
    let current_y = y
    for (let block of tree) {
        let h = getHeight(block)
        if (block.type == 0) { // sequential statement - function call
            svgAppendix += createSequenceBlock(x, current_y, width, h, block.name + '(' + block.arguments[0] + ')').svgAppendix
            current_y += h
        }
        else if (block.type == 1) { //ifs
            if (block.branches.length != 1) {
                throw new Error('Expected 1 branches, Nassi-Shneiderman diagrams only support single IF or one IF-ELSE statement')
            }
            var sub_block = createDecisionBlock(x, current_y, width, h * 3, block.name + '(' + block.arguments[0] + ')', "TRUE", "FALSE");
            svgAppendix += sub_block.svgAppendix;
            var bounds1 = sub_block.children[0];
            svgAppendix += convert(bounds1.start_x, bounds1.start_y, bounds1.width, bounds1.height, block.branches[0]);
            current_y += h
        }
        else if (block.type == 2) { //ifs and else

        }
    }
    return svgAppendix
}

function getHeight(block) {
    const base_h = 20;
    if (block.type == 0) {
        return base_h
    }
    else {
        var heights = []
        console.log(block)
        for (let branch of block.branches) {
            let current_heigth = 0
            for (let sub_block of branch) {
                current_heigth += getHeight(sub_block)
            }
            heights.push(current_heigth)
        }
        return base_h * 3 / 2 + Math.max(...heights)
    }
}