function createStartEndBlock(x, y, width, height, content) {
    var h = 20;
    var svgAppendix =  `<rect x="${x}" y="${y}" width="${width}" height="${h}" stroke="black" fill="lightblue" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">${content}</text>`;
    return {svgAppendix: svgAppendix, children: []};
}

function createSequenceBlock(x, y, width, height, content) {
    svgAppendix = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightgreen" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">${content}</text>`;
    return {svgAppendix: svgAppendix, children: []};
}

function createDecisionBlock(x, y, width, height, question, answerA, answerB) {
    var h = 20;
    var h_extra = h / 2;
    svgAppendix = `<polygon points="${x},${y} ${x + width},${y} ${x + width / 2},${y + h}" stroke="black" fill="lightyellow" />
        <polygon points="${x},${y} ${x},${y + h + h_extra} ${x + width / 2},${y + h + h_extra} ${x + width / 2},${y + h}" stroke="black" fill="lightyellow" />
        <polygon points="${x + width},${y} ${x + width},${y + h + h_extra} ${x + width / 2},${y + h + h_extra} ${x + width / 2},${y + h}" stroke="black" fill="lightyellow" />
        <text x="${x + width / 2}" y="${y + h / 2}" font-size="14px" fill="black" text-anchor="middle">${question}</text>
        <text x="${x + 7 * width / 8}" y="${y + h}" font-size="14px" fill="black" text-anchor="middle">${answerB}</text>
        <text x="${x + width / 8}" y="${y + h}" font-size="14px" fill="black" text-anchor="middle">${answerA}</text>`;

    childA = {start_x: x, start_y: y + h + h_extra, width: width / 2, height: height - h - h_extra};
    childB = {start_x: x + width / 2, start_y: y + h + h_extra, width: width / 2, height: height - h - h_extra};

    return {svgAppendix: svgAppendix, children: [childA, childB]};
}

// TODO: function createSwitchCaseBlock
// more...