/// <reference types="node" />

import { EventEmitter } from 'events';

import { Transport, TransportOptions } from '..';

import * as shared from './shared';

import Mail = require('./mailer');
import MailMessage = require('./mailer/mail-message');
import MimeNode = require('./mime-node');

declare namespace JSONTransport {
    type MailOptions = Mail.Options;

    interface Options extends MailOptions, TransportOptions {
        jsonTransport: true;
        skipEncoding?: boolean | undefined;
    }

    interface SentMessageInfo {
        /** an envelope object {from:‘address’, to:[‘address’]} */
        envelope: MimeNode.Envelope;
        /** the Message-ID header value */
        messageId: string;
        /** JSON string */
        message: string;
    }
}

declare class JSONTransport implements Transport<JSONTransport.SentMessageInfo> {
    options: JSONTransport.Options;

    logger: shared.Logger;
    mailer: Mail<JSONTransport.SentMessageInfo>;

    name: string;
    version: string;

    constructor(options: JSONTransport.Options);

    /** Compiles a mailcomposer message and forwards it to handler that sends it */
    send(mail: MailMessage<JSONTransport.SentMessageInfo>, callback: (err: Error | null, info: JSONTransport.SentMessageInfo) => void): void;
}

export = JSONTransport;
