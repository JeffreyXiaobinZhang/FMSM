export interface IProjectTask {
    id: string;
    createdAt: string;
    updatedAt: string;
    projectId: string;
    itemName: string; 
    itemDescription: string;
    itemCategory: string;
    unitRate: number;
    orderQty: number;
    claimedQty: number;
    currentValue: number;
    remark: string;
}