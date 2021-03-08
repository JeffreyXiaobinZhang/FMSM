export interface IWarehouse {
    id: string;
    createdAt: string;
    updatedAt: string;
    partNo: string;
    name: string;
    stock: number;
    price: number;
    description: string;
    supplier: string;
    url: string;
}