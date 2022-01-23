import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '20s', target: 100 },
        { duration: '30s', target: 20 }, //primero estagio
        
        { duration: '20s', target: 200 },//primero estagio
        { duration: '30s', target: 0 },//primero estagio
    ],
};

export default function () {
    const response = http.get('https://httpbin.org/');
    check(response, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
