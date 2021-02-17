export const REMOVE_TAG = "remove-tag";
export const ADD_TAG = "add-tag";

var observers = {};
let instance = null;

class NotificationService {
	
	constructor() {
		if(!instance) {
			instance = this;
		}
		return instance;
	}
	
	postNotification = (notifName,data) => {
		var obs = observers[notifName];
		if(obs) {
			for(var x=0;x<obs.length;x++) {
				var obj = obs[x];
				obj.callBack(data);
			}
		}
	}
	
	addObserver = (notifName,observer,callBack) => {
		var obs = observers[notifName];
		if(!obs) {
			observers[notifName] = [];
		}
		var obj = {observer: observer, callBack: callBack};
		observers[notifName].push(obj);
	}
	
	removeObserver = (notifName,observer) => {
		var obs = observers[notifName];
		for(var x=0;x<obs.length;x++) {
			if(obs.observer === observer) {
				obs.splice(x,1);
				break;
			}
		}
		observers[notifName] = obs;
	}
	
}

export default NotificationService;