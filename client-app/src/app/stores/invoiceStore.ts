import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IInvoice } from '../models/invoice';
import agent from '../api/agent';


//MobX require using @actions for modifying observables
// by setting configurations to always enforce this policy
// MobX will now throw an error is you try to modify an observable outside of an action
configure({enforceActions: "always"});

class InvoiceStore {
    @observable invoiceRegistry = new Map();
    @observable invoice: IInvoice | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = "";

    // sort the invoice by Date
    @computed get invoiceByDate() {
        // Array.from() create an Array instance from an Array-like object
        return Array.from(this.invoiceRegistry.values()).sort(
            // sort the element by ascending order
            (a, b) => Date.parse(a.issueDate) - Date.parse(b.issueDate)
        );
    }

    @action loadInvoices = async () => {
        this.loadingInitial = true;
        try {
            const invoices = await agent.Invoices.list();
            runInAction("loading invoices", () => {
                invoices.forEach(invoice => {
                    this.invoiceRegistry.set(invoice.id, invoice);
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction("load Invoices error", () => {
                this.loadingInitial = false;
            })
        }
    };

    @action loadInvoice = async (id: string) => {
        let invoice = this.getInvoice(id);
        if (invoice) {
            this.invoice = invoice;
        } else {
            this.loadingInitial = true;
            try {
                invoice = await agent.Invoices.details(id);
                runInAction("getting invoice", () => {
                    this.invoice = invoice;
                    this.loadingInitial = false;
                })
            } catch(error) {
                runInAction("get invoice error", () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    @action clearInvoice = () => {
        this.invoice = null;
    }

    getInvoice = (id: string) => {
        return this.invoiceRegistry.get(id);
    }

    @action createInvoice = async (invoice: IInvoice) => {
        this.submitting = true;
        try {
            invoice.createdAt = new Date().toJSON();
            invoice.updatedAt = new Date().toJSON();
            await agent.Invoices.create(invoice);
            runInAction("create invoice", () => {
                this.submitting = false;
            })
        } catch(error) {
            runInAction('create invoice error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editInvoice = async (invoice : IInvoice) => {
        this.submitting = true;
        try {
            await agent.Invoices.update(invoice);
            runInAction("editing invoice", () => {
                this.invoiceRegistry.set(invoice.id, invoice);
                this.invoice = invoice;
                this.submitting = false;
            })
        } catch (error) {
            runInAction("edit invoice error", () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action deleteInvoice = async(event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Invoices.delete(id);
            runInAction("deleting invoice", () => {
                this.invoiceRegistry.delete(id);
                this.submitting = false;
                this.target = "";
            })
        } catch(error) {
            runInAction("delete invoice error", () => {
                this.submitting = false;
                this.target = "";
            })
            console.log(error);
        }
    }
}

export default createContext(new InvoiceStore());
