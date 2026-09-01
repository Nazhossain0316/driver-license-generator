function generateTestDLBarcodeData() {

    const firstNames = [
        "NAZ", "RAV", "APPU", "SOWMYA", "RAJA",
        "VENGAL", "JAGGU", "NAVAYA", "PRIYA", "ASFIYA"
    ];

    const lastNames = [
        "SMITH", "JONES", "MILLER", "DAVIS", "WARD",
        "PARKER", "RUSSELL", "FOSTER", "COOPER", "KING"
    ];

    const cities = [
        "CINCINNATI",
        "COLUMBUS",
        "DAYTON",
        "AKRON",
        "TOLEDO",
        "CLEVELAND"
    ];

    const eyeColors = ["BLU", "BRO", "GRN", "HAZ", "GRY"];
    const hairColors = ["BLK", "BRO", "BLN", "RED", "GRY"];

    const randomItem = arr =>
        arr[Math.floor(Math.random() * arr.length)];

    const randomNumber = length =>
        Array.from(
            {length},
            () => Math.floor(Math.random() * 10)
        ).join("");

    const randomAlphaNum = length => {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        return Array.from(
            {length},
            () =>
                chars[
                    Math.floor(
                        Math.random() * chars.length
                    )
                    ]
        ).join("");
    };

    const randomDate = (startYear, endYear) => {
        const year =
            Math.floor(
                Math.random() *
                (endYear - startYear + 1)
            ) + startYear;

        const month =
            String(
                Math.floor(Math.random() * 12) + 1
            ).padStart(2, "0");

        const day =
            String(
                Math.floor(Math.random() * 28) + 1
            ).padStart(2, "0");

        return `${month}${day}${year}`;
    };

    return `@
ANSI 636343090001DL00310220DLDAQ${randomNumber(7)}
DCS${randomItem(lastNames)}
DDEN
DAC${randomItem(firstNames)}
DDFN
DAD
DDGN
DCAD
DCBNONE
DCDNONE
DBA${randomDate(2030, 2035)}
DBD
DBB${randomDate(1975, 2000)}
DBC${Math.random() < 0.5 ? "1" : "2"}
DAY${randomItem(eyeColors)}
DAZ${randomItem(hairColors)}
DAU070 in
DAG${100 + Math.floor(Math.random() * 9999)}MainSt
DAI${randomItem(cities)}
DAJOH
DAK45${randomNumber(3)}
DCGUSA
DCF${randomAlphaNum(16)}
DCJ${randomAlphaNum(16)}
DCK${randomAlphaNum(16)}
DDAF
DDB${randomDate(2020, 2026)}`;
}

function renderPdf417(data) {

    try {

        bwipjs.toCanvas(
            document.getElementById('barcode'),
            {
                bcid: 'pdf417',
                text: data,
                scale: 2,
                height: 15,
                includetext: false
            }
        );

    } catch (e) {
        console.error(e);
        alert("Barcode generation failed.");
    }
}

document
    .getElementById('generate')
    .addEventListener('click', () => {

        const data =
            generateTestDLBarcodeData();

        document.getElementById('output')
            .textContent = data;

        renderPdf417(data);
    });

document
    .getElementById('copy')
    .addEventListener('click', async () => {

        const text =
            document.getElementById('output')
                .textContent;

        await navigator.clipboard
            .writeText(text);

        alert('Copied!');
    });
