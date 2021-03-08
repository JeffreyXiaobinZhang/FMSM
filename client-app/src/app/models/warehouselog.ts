export interface IWarehouseLog {
    id: string;
    createdAt: string;
    updatedAt: string;
    projectId: string;
    orderNo: string;
    partNo: string;
    uom: string;
    quantity: number;
    stock: number;
    status: string;
    pickedBy: string;
    assignedTo: string;
    url: string;
    remark: string;
}