import axios, { AxiosResponse } from 'axios';
import { IProject } from '../models/project';
import { IProjectTask } from '../models/projecttask';
import { ISORList } from '../models/sorlist';
import { ITechnician } from '../models/technician';
import { ITaskTechnician } from '../models/tasktechnician';
import { IProjectLog } from '../models/projectlog';
import { IWarehouse } from '../models/warehouse';
import { IInvoice } from '../models/invoice';
import { IWarehouseLog } from '../models/warehouselog';
import { IProjectStock } from '../models/projectstock';
import {IThirdparty} from '../models/thirdparty';
import {IProjectVendor} from '../models/projectvendor';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(100)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(100)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(100)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(100)).then(responseBody) 
};

const Projects = {
    list: (): Promise<IProject[]> => requests.get('/projects'),
    listStatus: (status: string): Promise<IProject[]> => requests.get(`/projects/${status}`),
    details: (id: string) => requests.get(`/projects/${id}`),
    create: (project: IProject) => requests.post('/projects', project),
    update: (project: IProject) => requests.put(`/projects/${project.id}`, project),
    delete: (id: string) => requests.del(`/projects/${id}`)
}

const ProjectTasks = {
    list: (projectId: string): Promise<IProjectTask[]> => requests.get(`/projecttasks/${projectId}`),
    details: (id: string) => requests.get(`/projecttasks/${id}`),
    create: (projecttask: IProjectTask) => requests.post('/projecttasks', projecttask),
    update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    delete: (id: string) => requests.del(`/projecttasks/${id}`)
}

const ProjectVendors = {
    list: (projectId: string): Promise<IProjectVendor[]> => requests.get(`/projectvendors/${projectId}`),
    details: (id: string) => requests.get(`/projectvendors/${id}`),
    create: (projectvendor: IProjectVendor) => requests.post('/projectvendors', projectvendor),
    update: (projectvendor: IProjectVendor) => requests.put(`/projectvendors/${projectvendor.id}`, projectvendor),
    delete: (id: string) => requests.del(`/projectvendors/${id}`)
}

const SORLists = {
    list: (): Promise<ISORList[]> => requests.get('/sorlists'),
    details: (name: string) => requests.get(`/sorlists/${name}`),
    create: (sorlist: ISORList) => requests.post('/sorlists', sorlist),
    update: (sorlist: ISORList) => requests.put(`/sorlists/${sorlist.name}`, sorlist),
    delete: (name: string) => requests.del(`/sorlists/${name}`)
}

const ThirdParties = {
    list: (): Promise<IThirdparty[]> => requests.get('/ThirdParties'),
    details: (name: string) => requests.get(`/ThirdParties/${name}}`),
    create: (thirdparty: IThirdparty) => requests.post('/ThirdParties', thirdparty),
    update: (thirdparty: IThirdparty) => requests.put(`/ThirdParties/${thirdparty.companyName}`, thirdparty),
    delete: (name: string) => requests.del(`/ThirdParties/${name}`)
}

const Technicians = {
    list: (): Promise<ITechnician[]> => requests.get('/technicians'),
    details: (id: string) => requests.get(`/technicians/${id}`),
    create: (technician: ITechnician) => requests.post('/technicians', technician),
    update: (technician: ITechnician) => requests.put(`/technicians/${technician.id}`, technician),
    delete: (id: string) => requests.del(`/technicians/${id}`)
}

const TaskAssignments = {
    list: (projectId: string): Promise<ITaskTechnician[]> => requests.get(`/taskassignments/${projectId}`),
    // details: (id: string) => requests.get(`/technicians/${id}`),
    // create: (technician: ITechnician) => requests.post('/technicians', technician),
    update: (tasktechnician: ITaskTechnician) => requests.put(`/taskassignments/${tasktechnician.projectId}`,tasktechnician),
    // delete: (id: string) => requests.del(`/technicians/${id}`)
}

const ProjectLogs = {
    list: (projectId: string): Promise<IProjectLog[]> => requests.get(`/projectlogs/${projectId}`),
    // details: (id: string) => requests.get(`/projecttasks/${id}`),
    create: (projectlog: IProjectLog) => requests.post('/projectlogs', projectlog),
    // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    // delete: (id: string) => requests.del(`/projecttasks/${id}`)
}

const Warehouses = {
    list: (): Promise<IWarehouse[]> => requests.get('/warehouses'),
    details: (id: string) => requests.get(`/warehouses/${id}`),
    create: (warehouse: IWarehouse) => requests.post('/warehouses', warehouse),
    update: (warehouse: IWarehouse) => requests.put(`/warehouses/${warehouse.id}`, warehouse),
    delete: (id: string) => requests.del(`/warehouses/${id}`)
}

const Invoices = {
    list: (): Promise<IInvoice[]> => requests.get('/invoices'),
    details: (id: string) => requests.get(`/invoices/${id}`),
    create: (invoice: IInvoice) => requests.post('/invoices', invoice),
    update: (invoice: IInvoice) => requests.put(`/invoices/${invoice.id}`, invoice),
    delete: (id: string) => requests.del(`/invoices/${id}`)
}

const WarehouseLogs = {
    list: (projectId: string): Promise<IWarehouseLog[]> => requests.get(`/warehouselogs/${projectId}`),
    // details: (id: string) => requests.get(`/projecttasks/${id}`),
    create: (warehouselog: IWarehouseLog) => requests.post('/warehouselogs', warehouselog),
    // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    // delete: (id: string) => requests.del(`/projecttasks/${id}`)
}

const ProjectStocks = {
    list: (projectId: string): Promise<IProjectStock[]> => requests.get(`/projectstocks/${projectId}`),
    // details: (id: string) => requests.get(`/projecttasks/${id}`),
    // create: (projectlog: IProjectLog) => requests.post('/projectlogs', projectlog),
    // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    // delete: (id: string) => requests.del(`/projecttasks/${id}`)
}



export default {
    Projects,
    SORLists,
    ProjectTasks,
    Technicians,
    TaskAssignments,
    ProjectLogs,
    Warehouses,
    Invoices,
    ProjectVendors,
    WarehouseLogs,
    ProjectStocks,
    ThirdParties,
}