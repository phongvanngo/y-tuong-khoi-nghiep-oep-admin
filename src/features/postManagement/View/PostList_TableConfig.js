export const columns = [
    {
        id: 'numericalOrder',
        label: 'Số thứ tự',
        minWidth: 10,
        maxWidth: 10,
        width: "5%"
    },
    {
        id: 'gName',
        label: 'Tên nhóm',
        minWidth: 100,
        maxWidth: 300,
        width: "15%"
    },
    {
        id: 'iContent',
        label: 'Nội dung ý tưởng',
        minWidth: 300,

        format: (value) => value.toLocaleString('en-US'),
        maxWidth: 500,
        width: "30%",
    },
    {
        id: 'iType',
        label: 'Loại ý tưởng',
        minWidth: 200,
        width: "20%",

        format: (value) => value.toLocaleString('en-US'),
        maxWidth: 500
    },
    {
        id: 'iDescVideo',
        label: 'Link Video mô tả',
        minWidth: 100,
        width: "10%",

        format: (value) => value.toLocaleString('en-US'),
        maxWidth: 100,

    },
    {
        id: 'iManagerContact',
        label: 'Facebook nhóm trưởng',
        minWidth: 50,
        width: "10%",
        maxWidth: 50
    },
    {
        id: 'Edit',
        label: '',
        minWidth: 10,
        width: "10%",

        maxWidth: 10
    },
];

export const colu = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];