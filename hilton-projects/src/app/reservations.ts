export interface Reservation {
    id: string;
    guest_name: string;
    arrival_time: string;
    guest_contact: string;
    table_size: number;
    status: string;
  }
  
export const reservations = [
    {
        id: 1,
        guest_name: "dummy guest 1",
        arrival_time: "2022-07-01 7:00 AM",
        guest_contact: "phone: 12345678",
        table_size: 5,
        status: "open",
    },
    {
        id: 2,
        guest_name: "dummy guest 2",
        arrival_time: "2022-07-01 8:00 AM",
        guest_contact: "phone: 22345678",
        table_size: 9,
        status: "closed",
    }
  ];