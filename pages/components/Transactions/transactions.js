import { Card, CardBody ,Table,CardHeader} from 'reactstrap';
import useTranslation from '../../hooks/useTranslation';
import * as Icon from 'react-feather';


const Transactions = () => {
    const { t } = useTranslation();

    return (
        <Card className='border-0'>
                    <CardHeader style={{ paddingBottom: "0" }}>
                        <h4 style={{ fontWeight: "600", color: "	#1186a2" }}>{t('heading_recent_transactions')}</h4>
                    </CardHeader>
                    <CardBody style={{ paddingTop: "0" }}>
                        <Table className="no-wrap mt-0 align-middle table table-sm txtRecentTransactions" responsive borderless style={{ fontSize: "11px" }}>
                            <thead>
                                <tr>
                                    <th>13 Diciembre 2022</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Icon.ArrowDownLeft style={{ color: "#00E672" }} />
                                    </td>
                                    <td>
                                        From Magdiel
                                    </td>
                                    <td>3:50 pm </td>
                                    <td>Zapato Rojo Versace</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Icon.ArrowUpRight />
                                    </td>
                                    <td>
                                        From Magdiel
                                    </td>
                                    <td>3:50 pm </td>
                                    <td>Zapato Rojo Versace</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
    );
};

export default Transactions;
