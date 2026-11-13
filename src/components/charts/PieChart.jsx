const RADIUS = 100
const CENTER = 110
const SLICE_OFFSET = 8

const pointAt = (angle) => [CENTER + RADIUS * Math.cos(angle), CENTER + RADIUS * Math.sin(angle)]

function buildSlices(groups, total) {
    let startAngle = -Math.PI / 2
    return groups.map((group) => {
        const sweep = (group.total / total) * 2 * Math.PI
        const endAngle = startAngle + sweep
        const middle = (startAngle + endAngle) / 2
        const [x1, y1] = pointAt(startAngle)
        const [x2, y2] = pointAt(endAngle)
        const slice = {
            id: group.id,
            color: group.color,
            offset: [SLICE_OFFSET * Math.cos(middle), SLICE_OFFSET * Math.sin(middle)],
            path: `M${CENTER} ${CENTER}L${x1} ${y1}A${RADIUS} ${RADIUS} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x2} ${y2}Z`,
        }
        startAngle = endAngle
        return slice
    })
}

export default function PieChart({ groups, total }) {
    return (
        <svg
            viewBox="0 0 220 220"
            className="pie"
            role="img"
            aria-label={groups.length ? 'Spending by category' : 'No data yet'}
        >
            {groups.length === 0 && <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#eee" />}
            {groups.length === 1 && <circle cx={CENTER} cy={CENTER} r={RADIUS} fill={groups[0].color} />}
            {groups.length > 1 &&
                buildSlices(groups, total).map((slice) => (
                    <path
                        key={slice.id}
                        d={slice.path}
                        fill={slice.color}
                        stroke="#fff"
                        strokeWidth="2"
                        transform={`translate(${slice.offset[0]} ${slice.offset[1]})`}
                    />
                ))}
        </svg>
    )
}