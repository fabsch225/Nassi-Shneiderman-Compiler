function createStartEndBlock(x, y, width, height) {
    var h = 20;
    var svgAppendix =  `<rect x="${x}" y="${y}" width="${width}" height="${h}" stroke="black" fill="lightblue" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">Start</text>`;
    svgAppendix +=  `<rect x="${x}" y="${y + height - h}" width="${width}" height="${h}" stroke="black" fill="lightblue" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">End</text>`;
    var child = {start_x: x, start_y: y + h, width: width, height: height};
}

function createSequenceBlock(x, y, width, height) {
    svgAppendix = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightgreen" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">Sequence</text>`;
}

function createDecisionBlock(x, y, width, height) {
    svgAppendix = `<polygon points="${x},${y + height / 2} ${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height}" stroke="black" fill="lightyellow" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">Decision</text>`;
}

function createLoopBlock(x, y, width, height) {
    svgAppendix = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightcoral" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">Loop</text>`;
}

function createForeachBlock(x, y, width, height) {
    const textX = x + width / 2;
    const textY = y + height / 2;
    const lineHeight = 20;
    const textIndent = 10;
    
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightpink" />
        <text x="${textX}" y="${textY - lineHeight}" font-size="14px" fill="black" text-anchor="middle">Foreach</text>
        <text x="${textX}" y="${textY}" font-size="14px" fill="black" text-anchor="middle">Item:</text>
        <text x="${textX}" y="${textY + lineHeight}" font-size="14px" fill="black" text-anchor="middle" style="text-indent: ${textIndent}px;">Loop body</text>`;
}

function createJumpBlock(x, y, width, height) {
    svgAppendix = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightgrey" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">Jump</text>`;
}

function createSwitchCaseBlock(x, y, width, height, cases) {
    const caseHeight = height / (cases.length + 1);
    let svgAppendix = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightcyan" />`;
    
    cases.forEach((item, index) => {
        const caseY = y + caseHeight * (index + 1);
        svgAppendix += `<text x="${x + width / 2}" y="${caseY}" font-size="14px" fill="black" text-anchor="middle">${item}</text>`;
    });
    
    svgAppendix += `<text x="${x + width / 2}" y="${y + 20}" font-size="14px" fill="black" text-anchor="middle">Switch</text>`;
    return switchCasesvgAppendix;
}