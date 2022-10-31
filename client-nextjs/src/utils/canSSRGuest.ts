import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';


// Only visitors
export function canSSRguest<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(context);

        //if user is already loged
        if (cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return await fn(context);
    }
}
