
import { welcomeMessage } from './utils/messages';
import { Context } from 'probot';

export const handlePrOpened = async (context: Context): Promise<any> => {
    return welcomeMessage(context);
  };


// export const handlePrComment = async (context: Context): Promise<any> => {

// }
