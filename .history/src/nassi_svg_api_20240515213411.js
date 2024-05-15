function createStartEndBlock(x, y, width, height) {
    var h = 20;
    var svgAppendix =  `<rect x="${x}" y="${y}" width="${width}" height="${h}" stroke="black" fill="lightblue" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">Start</text>`;
    svgAppendix +=  `<rect x="${x}" y="${y + height - h}" width="${width}" height="${h}" stroke="black" fill="lightblue" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">End</text>`;
    var child = {start_x: x, start_y: y + h, width: width, height: height - 2 * h};

    return {svgAppendix: svgAppendix, children: [child]};
}

function createSequenceBlock(x, y, width, height) {
    svgAppendix = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightgreen" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">Sequence</text>`;
}

function createDecisionBlock(x, y, width, height, question, answerA, answerB) {
    var h = 20;
    svgAppendix = `<polygon points="${x},${y} ${x + width},${y} ${x + width / 2},${y + h}" stroke="black" fill="lightyellow" />
        <text x="${x + width / 2}" y="${y + h / 2}" font-size="14px" fill="black" text-anchor="middle">${question}</text>
        <text x="${x}" y="${y + h}" font-size="14px" fill="black" text-anchor="middle">${answerA}</text>
        <text x="${x + width}" y="${y + h}" font-size="14px" fill="black" text-anchor="middle">${answerB}</text>`;

    childA = {start_x: x, start_y: y + h, width: width / 2, height: height - h};
    childB = {start_x: x + width / 2, start_y: y + h, width: width / 2, height: height - h};

    return {svgAppendix: svgAppendix, children: [childA, childB]};
}

// TODO: function createSwitchCaseBlock