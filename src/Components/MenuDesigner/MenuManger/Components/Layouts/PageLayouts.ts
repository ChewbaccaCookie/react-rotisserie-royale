import CenteredPriceBottom from "./CenteredPriceBottom/CenteredPriceBottom";
import TwoColumnsBlock from "./TwoColumnsBlock/TwoColumnsBlock";
import TwoColumnsPriceBottom from "./TwoColumnsPriceBottom/TwoColumnsPriceBottom";

const PAGE_LAYOUTS: { [layout in PageLayouts]: any } = {
	"centered-price-bottom": CenteredPriceBottom,
	"centered-block": undefined as any,
	"centered-price-right": undefined as any,
	"two-columns-block": TwoColumnsBlock,
	"two-columns-price-bottom": TwoColumnsPriceBottom,
};
export default PAGE_LAYOUTS;

export const toOneColumn = (columns: Section[][]) => {
	let oneColumn: Section[] = [];
	columns.forEach((x) => (oneColumn = oneColumn.concat(x)));
	return oneColumn;
};
