import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ScreenViews, ScreenView } from '../types';
import EditScreenView from './dialogues/EditScreenView'
import DeleteScreenView from './dialogues/DeleteScreenView'

export default class ScreenViewTable extends React.Component<ScreenViews> {
    render() {
        return (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Flavors Displayed</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.screen_views.map((row: ScreenView) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.flavor_id}</TableCell>
                      <TableCell>
                        <div style={{
                            display: 'flex',
                          }}>
                          {<EditScreenView data={row}/>}
                          {<DeleteScreenView data={row}/>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
    }
  
}
