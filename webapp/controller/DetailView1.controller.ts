import MessageBox from 'sap/m/MessageBox';
import Table from 'sap/m/Table';
import Core from 'sap/ui/core/Element';
import UIComponent from 'sap/ui/core/UIComponent';
import Controller from 'sap/ui/core/mvc/Controller';
import History from 'sap/ui/core/routing/History';
import { Route$MatchedEvent } from 'sap/ui/core/routing/Route';
import Filter from 'sap/ui/model/Filter';
import FilterOperator from 'sap/ui/model/FilterOperator';
import JSONModel from 'sap/ui/model/json/JSONModel';

/**
 * @namespace project1.controller
 */
export default class DetailView1 extends Controller {
  private oTable: Table;

  public onInit(): void {
    this.oTable = this.getView()?.byId('table2') as Table;
    const data = { categoryId: '' };
    const oModel = new JSONModel(data);
    this.getView()?.setModel(oModel);

    const oRouter = UIComponent.getRouterFor(this);
    oRouter.getRoute('RouteDetailView1')?.attachMatched((oEvent) => {
      this.onRouted(oEvent);
    }, this);
  }

  public onRouted(oEvent: Route$MatchedEvent) {
    this.oTable.unbindItems();

    const oParams = oEvent.getParameter('arguments');
    (this.getView()?.getModel() as JSONModel).setProperty(
      '/categoryId',
      (oParams as any).id
    );

    this.oTable.setVisible(true);
    this.oTable.bindItems({
      path: 'invoice>/Products',
      filters: [
        new Filter('CategoryID', FilterOperator.EQ, (oParams as any).id),
      ],
      template: this.oTable.getDependents()[0],
    });
  }

  onNavBack() {
    const oHistory = History.getInstance();
    const sPreviousHash = oHistory.getPreviousHash();
    if (sPreviousHash !== undefined) {
      window.history.go(-1);
    } else {
      const oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo('RouteView1');
    }
  }
}
