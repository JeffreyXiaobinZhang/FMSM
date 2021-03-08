import { observable, action, computed, configure, runInAction, reaction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IProject as IProject } from '../models/project';
import { IProjectTask as IProjectTask } from '../models/projecttask';
import { ITaskAssignment as ITaskAssignment } from '../models/taskassignment';
import { ITaskTechnician as ITaskTechnician } from '../models/tasktechnician';
import { ITechnician as ITechnician } from '../models/technician';
import { IProjectLog as IProjectLog } from '../models/projectlog';
import { IWarehouseLog as IWarehouseLog } from '../models/warehouselog';
import { ISORList } from '../models/sorlist';
import { IProjectStock as IProjectStock } from '../models/projectstock';
import {IProjectVendor} from '../models/projectvendor';
import { IThirdparty } from '../models/thirdparty';

import agent from '../api/agent';

configure({enforceActions: 'always'});

class ProjectStore {

  
  @observable projectvendorRegistry = new Map();
  @observable projectvendor: IProjectVendor | null = null;
  @observable selectedProjectVendor: IProjectVendor | undefined;
  @observable thirdRegistry = new Map();
  @observable thirdparty: IThirdparty | null = null;

  @observable projectRegistry = new Map();
  @observable project: IProject | null = null;
  @observable projecttaskRegistry = new Map();
  @observable projecttask: IProjectTask | null = null;
  @observable selectedProjectTask: IProjectTask | undefined;
  @observable taskassignmentRegistry = new Map();
  @observable taskassignment: ITaskAssignment | null = null;
  @observable tasktechnicianRegistry = new Map();
  @observable technician: ITechnician | null = null;
  @observable technicianRegistry = new Map();
  @observable tasktechnician: ITaskTechnician | null = null;
  @observable projectlogRegistry = new Map();
  @observable projectlog: IProjectLog | null = null;
  @observable warehouselogRegistry = new Map();
  @observable warehouselog: IWarehouseLog | null = null;
  @observable sorlistRegistry = new Map();
  @observable sorlist: ISORList | null = null;
  @observable projectstockRegistry = new Map();
  @observable projectstock: IProjectStock | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable editMode = false;
  @observable reload = false;


  @computed get projectvendorsByName() {
    return Array.from(this.projectvendorRegistry.values()).sort(
      (a, b) => a.companyName - b.companyName
    );
  }

  @computed get ThirdPartiesByName() {
    return Array.from(this.thirdRegistry.values()).sort(
      (a, b) => Date.parse(a.companyName) - Date.parse(b.companyName)
    );
  }

  @computed get projectsByDate() {
    return Array.from(this.projectRegistry.values()).sort(
      (a, b) => Date.parse(a.jobStartDate) - Date.parse(b.jobStartDate)
    );
  }

  @computed get projecttasksByName() {
    return Array.from(this.projecttaskRegistry.values()).sort(
      (a, b) => a.itemName - b.itemName
    );
  }

  @computed get tasktechniciansByCategory() {
    return Array.from(this.tasktechnicianRegistry.values()).sort(
      (a, b) => a.category - b.category
    );
  }

  @computed get techniciansByName() {
    return Array.from(this.technicianRegistry.values()).sort(
      (a, b) => Date.parse(a.name) - Date.parse(b.name)
    );
  }

  @computed get projectlogsByDate() {
    return Array.from(this.projectlogRegistry.values()).sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  }

  @computed get warehouselogsByDate() {
    return Array.from(this.warehouselogRegistry.values()).sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  }

  @computed get sorlistsByName() {
    return Array.from(this.sorlistRegistry.values()).sort(
      (a, b) => Date.parse(a.name) - Date.parse(b.name)
    );
  }

  @computed get projectstocksByName() {
    return Array.from(this.projectstockRegistry.values()).sort(
      (a, b) => Date.parse(a.partNo) - Date.parse(b.partNo)
    );
  }

  @action loadProjects = async () => {
    this.loadingInitial = true;
    try {
      const projects = await agent.Projects.list();
      runInAction('loading projects', () => {
        projects.forEach(project => {
    //      activity.jobStartDate = activity.jobStartDate.split('.')[0];
         project.jobStartDate = project.jobStartDate.substr(0,10);
         project.estimatedCompletionDate = project.estimatedCompletionDate.substr(0,10);
          this.projectRegistry.set(project.id, project);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load projects error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadProject = async (id: string) => {
    let project = this.getProject(id);
    if (project) {
      this.project = project;
    } else {
      this.loadingInitial = true;
      try {
        project = await agent.Projects.details(id);
        runInAction('getting project',() => {
          this.project = project;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get project error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearProject = () => {
    this.project = null;
  }

  getProject = (id: string) => {
    return this.projectRegistry.get(id);
  }

  @action loadProjectsStatus = async (event: SyntheticEvent<HTMLButtonElement>, status: string) => {
    this.loadingInitial = true;
   // const params  = new URLSearchParams({status: status});
    try {
    //  const activities = await agent.Projects.listStatus(params.toString());
     const projects = await agent.Projects.listStatus(status);
     this.projectRegistry.clear();
      runInAction('loading projects', () => {
        projects.forEach(project => {
          project.jobStartDate = project.jobStartDate.split('.')[0];
          this.projectRegistry.set(project.id, project);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load projects error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action createProject = async (project: IProject) => {
    this.submitting = true;
    try {
     // project.createdAt = new Date().toISOString();
     // project.updatedAt = new Date().toISOString();
      project.createdAt = new Date().toJSON();
      project.updatedAt = new Date().toJSON();

      await agent.Projects.create(project);
      runInAction('create project', () => {
        // this.projectRegistry.set(project.id, project);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create project error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editProject = async (project: IProject) => {
    this.submitting = true;
    try {
     // project.updatedAt = new Date().toJSON();
      await agent.Projects.update(project);
      runInAction('editing project', () => {
        this.projectRegistry.set(project.id, project);
        this.project = project;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit project error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteProject = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.id;
    try {
      await agent.Projects.delete(id);
      runInAction('deleting project', () => {
        this.projectRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete project error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }

@action loadProjectVendors = async (projectId: string) => {
  // this.loadingInitial = true;
  // this.reload = false;
  try {
    const projectvendors = await agent.ProjectVendors.list(projectId);
    this.projectvendorRegistry.clear();
    runInAction('loading vendors', () => {
      projectvendors.forEach(projectvendor => {
        this.projectvendorRegistry.set(projectvendor.id, projectvendor);
      });
      // this.loadingInitial = false;
      // this.reload = true;
    })

  } catch (error) {
    runInAction('load vendors error', () => {
      // this.loadingInitial = false;
    })
  }
}

@action createProjectVendor = async (projectvendor: IProjectVendor) => {
  this.submitting = true;
  try {
   // project.createdAt = new Date().toISOString();
   // project.updatedAt = new Date().toISOString();
   projectvendor.createdAt = new Date().toJSON();
   projectvendor.updatedAt = new Date().toJSON();

    await agent.ProjectVendors.create(projectvendor);
    runInAction('create project vendor', () => {
      this.submitting = false;
    })
  } catch (error) {
    runInAction('create project vendor error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action deleteProjectVendor = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
  this.submitting = true;
  this.reload = false;
  this.target = event.currentTarget.name;
  try {
    await agent.ProjectVendors.delete(id);
    runInAction('deleting project vendor', () => {
      this.projectvendorRegistry.delete(id);
      this.tasktechnicianRegistry.clear();
      this.submitting = false;
      this.reload = true;
      this.target = '';
    })
  } catch (error) {
    runInAction('delete project vendor error', () => {
      this.submitting = false;
      this.target = '';
    })
    console.log(error);
  }
}

@action editProjectVendor = async (projectvendor: IProjectVendor) => {
  this.submitting = true;
  try {
    await agent.ProjectVendors.update(projectvendor);
    runInAction('editing project vendor', () => {
      this.projectvendorRegistry.set(projectvendor.id, projectvendor);
      this.projectvendor = projectvendor;
      this.editMode = false;
      this.submitting = false;
    })

  } catch (error) {
    runInAction('edit project error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action selectProjectVendor = (id: string) => {
  this.selectedProjectVendor = this.projectvendorRegistry.get(id);
  this.editMode = true;
};



@action loadProjectTasks = async (projectId: string) => {
  this.loadingInitial = true;
  this.reload = false;
  try {
    const projecttasks = await agent.ProjectTasks.list(projectId);
    this.projecttaskRegistry.clear();
    runInAction('loading tasks', () => {
      projecttasks.forEach(projecttask => {
        this.projecttaskRegistry.set(projecttask.id, projecttask);
      });
      this.loadingInitial = false;
      this.reload = true;
    })

  } catch (error) {
    runInAction('load tasks error', () => {
      this.loadingInitial = false;
    })
  }
}

@action createProjectTask = async (projecttask: IProjectTask) => {
  this.submitting = true;
  try {
   // project.createdAt = new Date().toISOString();
   // project.updatedAt = new Date().toISOString();
    projecttask.createdAt = new Date().toJSON();
    projecttask.updatedAt = new Date().toJSON();

    await agent.ProjectTasks.create(projecttask);
    runInAction('create project SOR', () => {
   //    this.projecttaskRegistry.set(projecttask.id, projecttask);
      this.submitting = false;
    })
  } catch (error) {
    runInAction('create project error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action deleteProjectTask = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
  this.submitting = true;
  this.reload = false;
  this.target = event.currentTarget.name;
  try {
    await agent.ProjectTasks.delete(id);
    runInAction('deleting project SOR', () => {
      this.projecttaskRegistry.delete(id);
      this.tasktechnicianRegistry.clear();
      this.submitting = false;
      this.reload = true;
      this.target = '';
    })
  } catch (error) {
    runInAction('delete project SOR error', () => {
      this.submitting = false;
      this.target = '';
    })
    console.log(error);
  }
}

@action editProjectTask = async (projecttask: IProjectTask) => {
  this.submitting = true;
  try {
   // project.updatedAt = new Date().toJSON();
    await agent.ProjectTasks.update(projecttask);
    runInAction('editing project SOR', () => {
      this.projecttaskRegistry.set(projecttask.id, projecttask);
      this.projecttask = projecttask;
      this.editMode = false;
      this.submitting = false;
    })

  } catch (error) {
    runInAction('edit project error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action selectProjectTask = (id: string) => {
  this.selectedProjectTask = this.projecttaskRegistry.get(id);
  this.editMode = true;
};

@action cancelFormOpen = () => {
  this.editMode = false;
}



@action loadTaskAssignments = async (projectId: string) => {
  // this.loadingInitial = true;
  try {
    const tasktechnicians = await agent.TaskAssignments.list(projectId);
    this.tasktechnicianRegistry.clear();
    runInAction('loading tasks', () => {
      tasktechnicians.forEach(tasktechnician => {
        this.tasktechnicianRegistry.set(tasktechnician.category, tasktechnician);
      });
      // this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load tasks error', () => {
      // this.loadingInitial = false;
    })
  }
}


@action loadTechnicians = async () => {
  this.loadingInitial = true;
  try {
    const technicians = await agent.Technicians.list();
    this.technicianRegistry.clear();
    runInAction('loading technicians', () => {
      technicians.forEach(technician => {
        this.technicianRegistry.set(technician.name, technician);
      });
      this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load Technician List error', () => {
      this.loadingInitial = false;
    })
  }
};

// @action assignTechnician = async (event: SyntheticEvent<HTMLElement>, projectId: string, category: string, type: string) => {
//   let email = '@'; 
//   if (type === 'update') {
//   const name = event.currentTarget.textContent;
//   const selectEmail = this.technicianRegistry.get(name);
//   email = selectEmail.email;}

//   this.submitting = true;
//   try {
//     // project.updatedAt = new Date().toJSON();
//      await agent.TaskAssignments.update(projectId, category, email);
//      runInAction('assigning technician', () => {
//     //   this.tasktechnicianRegistry.set(category, tasktechnician);
//       //  this.projecttask = projecttask;
//        this.editMode = false;
//        this.submitting = false;
//      })
 
//    } catch (error) {
//      runInAction('edit project error', () => {
//        this.submitting = false;
//      })
//      console.log(error);
//    }
// };

@action getTechnicianInfo = async (event: SyntheticEvent<HTMLElement>, tasktechnician : ITaskTechnician) => {
  const name = event.currentTarget.textContent;
  if (name) 
  {
  const selectInfo = this.technicianRegistry.get(name);
  tasktechnician.techName = name;
  tasktechnician.techEmail = selectInfo.email;
  tasktechnician.techType = selectInfo.type;
  this.tasktechnicianRegistry.set(tasktechnician.category, tasktechnician);
  }
  
}

@action assignTechnician = async (tt : ITaskTechnician) => {

  this.submitting = true;
  try {
    // project.updatedAt = new Date().toJSON();
     await agent.TaskAssignments.update(tt);
     runInAction('assigning technician', () => {
    //   this.tasktechnicianRegistry.set(category, tasktechnician);
      //  this.projecttask = projecttask;
       this.editMode = false;
       this.submitting = false;
     })
 
   } catch (error) {
     runInAction('edit project error', () => {
       this.submitting = false;
     })
     console.log(error);
   }
};

@action updateMember = async (event: SyntheticEvent<HTMLElement>, tasktechnician : ITaskTechnician, name: keyof ITaskTechnician, value: string | number | undefined) => {
  let value1 = value!;  
  let value2 : string = value1.toString()
  tasktechnician[name] = value2;
    this.tasktechnicianRegistry.set(tasktechnician.category, tasktechnician);
};

@action warehouseOut = (
  event: SyntheticEvent<HTMLElement>, projectstock : IProjectStock, name : string, value: string 
) => {
  if (name==='assignedTo')
  {
    value = event.currentTarget.textContent!;
   projectstock.assignedTo = value;
   
  } else
  if (name==='quantity')
  {
   projectstock.quantity = value;
  } else
  if (name==='remark')
  {
   projectstock.remark = value;
  };
  this.projectstockRegistry.set(projectstock.partNo, projectstock);
};

@action loadProjectLogs = async (projectId: string) => {
  // this.loadingInitial = true;
  try {
    const projectlogs = await agent.ProjectLogs.list(projectId);
    this.projectlogRegistry.clear();
    runInAction('loading tasks', () => {
      projectlogs.forEach(projectlog => {
        this.projectlogRegistry.set(projectlog.id, projectlog);
      });
      // this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load tasks error', () => {
      // this.loadingInitial = false;
    })
  }
};

@action createProjectLog = async (projectlog: IProjectLog) => {
  this.submitting = true;
  try {
   // project.createdAt = new Date().toISOString();
   // project.updatedAt = new Date().toISOString();
   projectlog.createdAt = new Date().toJSON();
   projectlog.updatedAt = new Date().toJSON();

    await agent.ProjectLogs.create(projectlog);
    runInAction('create project log', () => {
   //    this.projecttaskRegistry.set(projecttask.id, projecttask);
      this.submitting = false;
    })
  } catch (error) {
    runInAction('create project log error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action loadThirdParties = async () => {
  this.loadingInitial = true;
  try {
    const thirdparties = await agent.ThirdParties.list();
    this.thirdRegistry.clear();
    runInAction('loading ThirdParties', () => {
      thirdparties.forEach(thirdparty => {
        this.thirdRegistry.set(thirdparty.companyName, thirdparty);
      });
      this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load ThirdParties List error', () => {
      this.loadingInitial = false;
    })
  }
};

@action loadSORLists = async () => {
  this.loadingInitial = true;
  try {
    const sorlists = await agent.SORLists.list();
    this.sorlistRegistry.clear();
    runInAction('loading sorlists', () => {
      sorlists.forEach(sorlist => {
        this.sorlistRegistry.set(sorlist.name, sorlist);
      });
      this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load SOR List error', () => {
      this.loadingInitial = false;
    })
  }
};

@action loadWarehouseLogs = async (projectId: string) => {
  // this.loadingInitial = true;
  try {
    const warehouselogs = await agent.WarehouseLogs.list(projectId);
    this.warehouselogRegistry.clear();
    runInAction('loading tasks', () => {
      warehouselogs.forEach(warehouselog => {
        // if (warehouselog.pickedBy)
        // {
        //   const selectEmail = this.technicianRegistry.get(warehouselog.pickedBy);
        //   warehouselog.pickedBy = selectEmail.email; 
        // };
        // if (warehouselog.assignedTo)
        // {
        //   const selectEmail = this.technicianRegistry.get(warehouselog.assignedTo);
        //   warehouselog.assignedTo = selectEmail.email; 
        // };
        this.warehouselogRegistry.set(warehouselog.id, warehouselog);
      });
      // this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load tasks error', () => {
      // this.loadingInitial = false;
    })
  }
};

@action createWarehouseLog = async (warehouselog: IWarehouseLog) => {
  this.submitting = true;
  try {
   // project.createdAt = new Date().toISOString();
   // project.updatedAt = new Date().toISOString();
   warehouselog.createdAt = new Date().toJSON();
   warehouselog.updatedAt = new Date().toJSON();

    await agent.WarehouseLogs.create(warehouselog);
    runInAction('create warehouse log', () => {
   //    this.projecttaskRegistry.set(projecttask.id, projecttask);
      this.submitting = false;
    })
  } catch (error) {
    runInAction('create warehouse log error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action loadProjectStocks = async (projectId: string) => {
  // this.loadingInitial = true;
  try {
    const projectstocks = await agent.ProjectStocks.list(projectId);
    this.projectstockRegistry.clear();
    runInAction('loading stocks', () => {
      projectstocks.forEach(projectstock => {
        projectstock.assignedTo = '';
        projectstock.quantity = '0';
        projectstock.remark = '';
        this.projectstockRegistry.set(projectstock.partNo, projectstock);
      });
      // this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load stocks error', () => {
      // this.loadingInitial = false;
    })
  }
};

}

export default createContext(new ProjectStore());
