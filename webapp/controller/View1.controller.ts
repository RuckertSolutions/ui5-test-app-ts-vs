import ColumnListItem from 'sap/m/ColumnListItem';
import MessageBox from 'sap/m/MessageBox';
import Event from 'sap/ui/base/Event';
import UIComponent from 'sap/ui/core/UIComponent';
import Controller from 'sap/ui/core/mvc/Controller';

/**
 * @namespace project1.controller
 */
export default class View1 extends Controller {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    // eslint-disable-next-line no-console
  }

  public onPress() {
    MessageBox.show('Hello from Dialog');
  }

  public onPressTableItem(oEvent: Event) {
    const router = UIComponent.getRouterFor(this);
    const oItem = oEvent.getSource() as ColumnListItem;
    const oBindingContext = oItem.getBindingContext('invoice');
    const oModel = this.getView()?.getModel('invoice');
    const sId = oModel?.getProperty('CategoryID', oBindingContext!);
    router.navTo('RouteDetailView1', { id: sId });
  }
}
