function createStartEndBlock(x, y, width, height, content) {
    var h = 20;
    var svgAppendix =  `<rect x="${x}" y="${y}" width="${width}" height="${h}" stroke="black" fill="lightblue" />
        <text x="${x + width / 2}" y="${y + height / 2 + h / 4}" font-size="14px" fill="black" text-anchor="middle">${content}</text>`;
    return {svgAppendix: svgAppendix, children: []};
}

function createSequenceBlock(x, y, width, height, content) {
    svgAppendix = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightgreen" />
        <text x="${x + width / 2}" y="${y + height / 2 + 4}" font-size="14px" fill="black" text-anchor="middle">${content}</text>`;
    return {svgAppendix: svgAppendix, children: []};
}

function createDecisionBlock(x, y, width, height, question, answerA, answerB, ratio) {
    var h = 20;
    var h_extra = h / 2;
    var left_offset = width * ratio;
    if (ratio == -1) {
        left_offset = width * 0.8;
        svgAppendix = `<polygon points="${x},${y} ${x + width},${y} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
        <polygon points="${x},${y} ${x},${y + h + h_extra} ${x + left_offset},${y + h + h_extra} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
        <text x="${x + left_offset}" y="${y + h / 2 + 4}" font-size="14px" fill="black" text-anchor="middle">${question}</text>
        <text x="${x + width / 8}" y="${y + h + 4}" font-size="14px" fill="black" text-anchor="middle">${answerA}</text>`;
    }
    else {
    svgAppendix = `<polygon points="${x},${y} ${x + width},${y} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
        <polygon points="${x},${y} ${x},${y + h + h_extra} ${x + left_offset},${y + h + h_extra} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
        <polygon points="${x + width},${y} ${x + width},${y + h + h_extra} ${x + left_offset},${y + h + h_extra} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
        <text x="${x + left_offset}" y="${y + h / 2 + 4}" font-size="14px" fill="black" text-anchor="middle">${question}</text>
        <text x="${x + 7 * width / 8}" y="${y + h + 4}" font-size="14px" fill="black" text-anchor="middle">${answerB}</text>
        <text x="${x + width / 8}" y="${y + h + 4}" font-size="14px" fill="black" text-anchor="middle">${answerA}</text>`;
    }
    childA = {start_x: x, start_y: y + h + h_extra, width: left_offset, height: height - h - h_extra};
    childB = {start_x: x + left_offset, start_y: y + h + h_extra, width: width - left_offset, height: height - h - h_extra};

    return {svgAppendix: svgAppendix, children: [childA, childB]};
}

function createPreLoopBlock(x, y, width, height, arguments) {
    var h = 20;
    var svgAppendix = `
        <polygon points="
            ${x},${y} 
            ${x + width},${y} 
            ${x + width},${y + h} 
            ${x + h},${y + h} 
            ${x + h},${y + height - h} 
            ${x + width},${y + height - h} 
            ${x + width},${y + height} 
            ${x},${y + height} 
            ${x},${y} 
        "stroke="black" fill="lightpink" />
        <text x="${x + width / 2}" y="${y + h / 2 + 4}" font-size="14px" fill="black" text-anchor="middle">${arguments}</text>`;

    child = {start_x: x + h, start_y: y + h, width: width - h, height: height - 2 * h};

    return {svgAppendix: svgAppendix, children: [child]};
}

function createPostLoopBlock(x, y, width, height, arguments) {
    var h = 20;
    var svgAppendix = `
        <polygon points="
            ${x},${y} 
            ${x + width},${y} 
            ${x + width},${y + h} 
            ${x + h},${y + h} 
            ${x + h},${y + height - h} 
            ${x + width},${y + height - h} 
            ${x + width},${y + height} 
            ${x},${y + height} 
            ${x},${y} 
        "stroke="black" fill="lightpink" />
        <text x="${x + width / 2}" y="${y + h / 2 + 4}" font-size="14px" fill="black" text-anchor="middle">do</text>
        <text x="${x + width / 2}" y="${y + height - h / 2 + 4}" font-size="14px" fill="black" text-anchor="middle">while(${arguments})</text>`;

    child = {start_x: x + h, start_y: y + h, width: width - h, height: height - 2 * h};

    return {svgAppendix: svgAppendix, children: [child]};
}

// TODO: function createSwitchCaseBlock
// more...