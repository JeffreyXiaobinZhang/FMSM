import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
//add new---------------------------------------------
import { IThirdparty } from '../models/thirdparty';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class ThirdStore {
  @observable thirdRegistry = new Map();
  @observable thirdparty: IThirdparty | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get ThirdPartiesByName() {
    return Array.from(this.thirdRegistry.values()).sort(
      (a, b) => Date.parse(a.companyName) - Date.parse(b.companyName)
    );
  }

  @action loadThirdParties = async () => {
    this.loadingInitial = true;
    try {
      const thirdparties = await agent.ThirdParties.list();
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

  @action loadThirdParty = async (companyName: string) => {
    let thirdparty = this.getthirdList(companyName);
    if (thirdparty) {
      this.thirdparty = thirdparty;
    } else {
      this.loadingInitial = true;
      try {
        thirdparty = await agent.ThirdParties.details(companyName);
        runInAction('getting thirdparty',() => {
          this.thirdparty = thirdparty;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get thirdparty error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearThirdParty = () => {
    this.thirdparty = null;
  }

  getthirdList = (companyName: string) => {
    return this.thirdRegistry.get(companyName);
  }

  @action createThirdParty = async (thirdparty: IThirdparty) => {
    this.submitting = true;
    try {
      thirdparty.id = '0';
      thirdparty.createdAt = new Date().toJSON();
      thirdparty.updatedAt = new Date().toJSON();
      await agent.ThirdParties.create(thirdparty);
      runInAction('create Third Party', () => {
        // this.thirdRegistry.set(thirdparty.name, thirdparty);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create Third Party error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editThirdParty = async (thirdparty: IThirdparty) => {
    this.submitting = true;
    try {
      await agent.ThirdParties.update(thirdparty);
      runInAction('editing thirdparty', () => {
        this.thirdRegistry.set(thirdparty.companyName, thirdparty);  //name > id
        this.thirdparty = thirdparty;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit thirdparty error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteThirdParty = async (event: SyntheticEvent<HTMLButtonElement>, name: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.ThirdParties.delete(name);
      runInAction('deleting Third Party', () => {
        this.thirdRegistry.delete(name);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete Third Party error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}

export default createContext(new ThirdStore());
