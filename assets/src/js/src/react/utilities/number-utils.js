export function formatPrice( num ) {

    let decimalPlaces = 2;

    if ( num > 10000 ) {
        decimalPlaces = 0;
    }

    if ( num < 1 && num !== 0 ) {
        decimalPlaces = 5
    }

    return "$" + numberWithCommas( num.toFixed(decimalPlaces) )
}

export function parseFloatOrZero( num ) {

    if ( isNaN( parseFloat( num ) ) ) {
        return 0
    }

    return parseFloat( num )

}

export function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
