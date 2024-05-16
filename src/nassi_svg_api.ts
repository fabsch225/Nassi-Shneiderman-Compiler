type Block = {
    svgAppendix: string;
    children: Array<{ start_x: number, start_y: number, width: number, height: number }>;
};

export function createStartEndBlock(x: number, y: number, width: number, height: number, content: string): Block {
    const h = 20;
    const svgAppendix = `
        <rect x="${x}" y="${y}" width="${width}" height="${h}" stroke="black" fill="lightblue" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">${content}</text>
    `;
    return { svgAppendix, children: [] };
}

export function createSequenceBlock(x: number, y: number, width: number, height: number, content: string): Block {
    const svgAppendix = `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="black" fill="lightgreen" />
        <text x="${x + width / 2}" y="${y + height / 2}" font-size="14px" fill="black" text-anchor="middle">${content}</text>
    `;
    return { svgAppendix, children: [] };
}

export function createDecisionBlock(x: number, y: number, width: number, height: number, question: string, answerA: string, answerB: string, ratio: number): Block {
    const h = 20;
    const h_extra = h / 2;
    let left_offset = width * ratio;
    let svgAppendix: string;

    if (ratio === -1) {
        left_offset = width * 0.8;
        svgAppendix = `
            <polygon points="${x},${y} ${x + width},${y} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
            <polygon points="${x},${y} ${x},${y + h + h_extra} ${x + left_offset},${y + h + h_extra} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
            <text x="${x + left_offset}" y="${y + h / 2}" font-size="14px" fill="black" text-anchor="middle">${question}</text>
            <text x="${x + width / 8}" y="${y + h}" font-size="14px" fill="black" text-anchor="middle">${answerA}</text>
        `;
    } else {
        svgAppendix = `
            <polygon points="${x},${y} ${x + width},${y} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
            <polygon points="${x},${y} ${x},${y + h + h_extra} ${x + left_offset},${y + h + h_extra} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
            <polygon points="${x + width},${y} ${x + width},${y + h + h_extra} ${x + left_offset},${y + h + h_extra} ${x + left_offset},${y + h}" stroke="black" fill="lightyellow" />
            <text x="${x + left_offset}" y="${y + h / 2}" font-size="14px" fill="black" text-anchor="middle">${question}</text>
            <text x="${x + 7 * width / 8}" y="${y + h}" font-size="14px" fill="black" text-anchor="middle">${answerB}</text>
            <text x="${x + width / 8}" y="${y + h}" font-size="14px" fill="black" text-anchor="middle">${answerA}</text>
        `;
    }

    const childA = { start_x: x, start_y: y + h + h_extra, width: left_offset, height: height - h - h_extra };
    const childB = { start_x: x + left_offset, start_y: y + h + h_extra, width: width - left_offset, height: height - h - h_extra };

    return { svgAppendix, children: [childA, childB] };
}

export function createPreLoopBlock(x: number, y: number, width: number, height: number, arguments_: string): Block {
    const h = 20;
    const svgAppendix = `
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
        " stroke="black" fill="lightpink" />
        <text x="${x + width / 2}" y="${y + h / 2}" font-size="14px" fill="black" text-anchor="middle">${arguments_}</text>
    `;

    const child = { start_x: x + h, start_y: y + h, width: width - h, height: height - 2 * h };

    return { svgAppendix, children: [child] };
}

export function createPostLoopBlock(x: number, y: number, width: number, height: number, arguments_: string): Block {
    const h = 20;
    const svgAppendix = `
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
        " stroke="black" fill="lightpink" />
        <text x="${x + width / 2}" y="${y + h / 2}" font-size="14px" fill="black" text-anchor="middle">do</text>
        <text x="${x + width / 2}" y="${y + height - h / 2}" font-size="14px" fill="black" text-anchor="middle">while(${arguments_})</text>
    `;

    const child = { start_x: x + h, start_y: y + h, width: width - h, height: height - 2 * h };

    return { svgAppendix, children: [child] };
}

// TODO: function createSwitchCaseBlock
// more...
