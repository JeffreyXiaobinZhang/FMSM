export interface IInvoice {
   id: string;
   createdAt: string;
   updatedAt: string;
   invoiceType: string;
   invoiceNo: string;
   orderNo: string;
   issueDate: string;
   subtotal: string;
   location: string;
   contractNo: string;
   customer: string;
   paymentStatus: string;
   referenceNo: string;
   remark: string;
}